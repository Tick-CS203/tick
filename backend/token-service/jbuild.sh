#!/bin/bash
date > log
./gradlew build --continuous -x test < /dev/null 2>> log &
#
#for i in {1..50}; do
#    echo -n '-' >> log
#done
#
#echo >> log
