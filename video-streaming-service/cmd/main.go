package main

import (
    "log"
    "net/http"
    "video-streaming-service/internal/handlers"
    "video-streaming-service/internal/services"
)

func main() {
    videoHandler := handlers.VideoHandler{
        StreamingService: &services.StreamingService{
            VideoPath: "video.mp4",
        },
    }

    http.HandleFunc("/stream", videoHandler.StreamVideo)

    log.Println("Starting server on :8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatalf("Could not start server: %s\n", err)
    }
}