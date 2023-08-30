#!/bin/bash
date > buildlog
./gradlew compileJava 2>> buildlog && ./gradlew bootRun < /dev/null &
#
#for i in {1..50}; do
#    echo -n '-' >> buildlog
#done
#
#echo >> buildlog
