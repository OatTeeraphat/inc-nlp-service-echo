FROM golang:alpine as build-env

RUN apk add git
RUN apk add ca-certificates
ENV GO111MODULE=on
WORKDIR $GOPATH/src/inc-nlp-service-echo/

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

ENV CGO_ENABLED=0

RUN go build

# FROM BUILDER PATH
FROM alpine
RUN apk add ca-certificates
COPY --from=build-env /go/src/inc-nlp-service-echo/ /go/src/inc-nlp-service-echo/
RUN chmod 700 /go/src/inc-nlp-service-echo/inc-nlp-service-echo

CMD /go/src/inc-nlp-service-echo/inc-nlp-service-echo