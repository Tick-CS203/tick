#!/bin/bash
for file in *; do
    if [ -d $file ]; then
        ( cd $file; ./mvnw package || ./gradlew bootJar; )
    fi
done
