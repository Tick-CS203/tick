#!/bin/bash
check() {
    #{ aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin $ECR_REGISTRY; }
    docker pull ${ECR_REGISTRY:?Run \"export ECR_REGISTRY variable\"}/$1 2>&1 > /dev/null\
        || { echo Error pulling image $ECR_REGISTRY/$1; exit 0; }

    image=$(docker images $1 --no-trunc --format "{{.ID}}")
    : ${image:?No such image $1}
    image=${image##sha256:}

    repo=$(docker images $ECR_REGISTRY/$1 --no-trunc --format "{{.ID}}")
    : ${repo:?Error using image $ECR_REGISTRY/$1}
    repo=${repo##sha256:}
    docker rmi $ECR_REGISTRY/$1 2>&1 > /dev/null
    echo "Repo:$repo Image:$image"

    if [ $repo = $image ] ; then
        echo Hashes are identical
        return 0
    else
        echo Hashes are different
        return 1
    fi
}

if [ $# = 0 ]; then
    echo "Usage: $0 image"
    exit;
fi
check ${1%%/}
