#!/bin/bash
date > log
./gradlew compileJava 2>> log

if [[ $? == 0 ]]; then
    echo Build good >> log
    ./gradlew bootRun < /dev/null &
fi
#
#for i in {1..50}; do
#    echo -n '-' >> log
#done
#
#echo >> log
