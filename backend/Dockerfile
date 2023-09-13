FROM busybox AS staging
WORKDIR /staging
COPY ./ ./
RUN if [ -d target ]; then \
    cp target/*.jar /app.jar; \
elif [ -d build/libs ]; then \
    name=`grep "'.*'" -o settings.gradle | grep -o "[^']*"`; \
    version=`grep "^version" build.gradle | grep -o "'.*'" | grep -o "[^']*"`; \
    cp "build/libs/$name-$version.jar" /app.jar; \
else \
    echo Jar file not found >&2; \
    exit 1; \
fi

FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY --from=staging /app.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
