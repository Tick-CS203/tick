#!/bin/bash
check() {
    #{ aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin $ECR_REGISTRY; }
    docker pull $ECR_REGISTRY/$1
    repo=$(docker images $ECR_REGISTRY/$1 --no-trunc --format "{{.ID}}")
    repo=${repo##sha256:}
    image=$(docker images $1 --no-trunc --format "{{.ID}}")
    image=${image##sha256:}
    docker rmi $ECR_REGISTRY/$1 2>&1 > /dev/null

    status=0
    if [ $repo = $image ] ; then
        echo Hashes are identical
    else
        echo Hashes are different
        status=1;
    fi
    return $status
}

if [ $# = 0 ]; then
    echo "Usage: $0 image"
    exit;
fi
check ${1%%/}
