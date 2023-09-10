FROM bellsoft/liberica-openjdk-alpine-musl:17
VOLUME /tmp
COPY target/session-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8085
ENTRYPOINT ["java","-jar","/app.jar"]
