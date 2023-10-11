#!/bin/bash
check() {
    { docker run --name container -d --env-file hashcheck.env $1 && docker cp container:/app.jar app.jar && docker container kill container && docker container rm container; } 2>&1 > /dev/null
    if ! [ -e $1/app.jar ]; then
        echo "Please run build.sh before checking"
        exit 1
    elif ! [ -e app.jar ]; then
        echo "Something went wrong extracting the jar from image"
        exit 1
    fi
    localhash=$(sha1sum $1/app.jar)
    remotehash=$(sha1sum app.jar)
    localhost=${localhash%% **}
    remotehost=${remotehash%% **}
    if [ $localhost = $remotehost ] ; then
        echo Hashes are identical
        return 0;
    else
        echo Hashes are different
        return 1;
    fi
    rm app.jar
}

if [ $# = 0 ]; then
    echo "Usage: $0 [folders]"
    exit;
fi
check ${1%%/}
