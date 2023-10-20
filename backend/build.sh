#!/bin/bash
exittext="Ctrl + C to exit auto-build"
files=$(ls -d */)
build() {
    cd $1;
    if [ -f mvnw ] ; then
        ./mvnw clean package ${maventest-"-Dmaven.test.skip"} || exit 1;
        cp target/*.jar app.jar;
    elif [ -f gradlew ] ; then
        ./gradlew clean $gradletest bootJar || exit 1;
        cp build/libs/*.jar app.jar;
    else
        echo "No executable found";
    fi
    cd ..;
}

buildall() {
    for file in $files; do
        echo "Currently in $file"
        build $file
        echo
    done
    exit;
}

cd "${0%/*}"

if [ $# -ne 0 ]; then
    if [ $1 = auto ]; then
        if [ $# -ne 2 ]; then
            echo usage: $0 $1 service-folder
            exit
        fi
        arg=${2%%/}
        docker compose up $arg -d
        echo $exittext
        trap "docker compose down; exit" SIGINT SIGTERM
        while true; do
            for file in $files; do
                file=${file%%/}
                if [ -n "$(find ${file}/src/main/java -newer ${file}/app.jar -print -quit 2> /dev/null)" ]; then
                    docker compose down
                    build $file
                    docker compose build $file
                    docker compose up $arg -d
                    echo $exittext;
                fi
            done;
            sleep 1;
        done;
elif [ $1 = all ]; then
    buildall;
elif [ $1 = test ]; then
    maventest=
    gradletest=test
    buildall;
else
    for file in $@; do
        build $file;
    done
    fi
fi
echo "usage: $0 [auto|all|test] service-folder"
