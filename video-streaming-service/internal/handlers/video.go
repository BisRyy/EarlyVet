package handlers

import (
    "net/http"
    "video-streaming-service/internal/services"
)

type VideoHandler struct {
    StreamingService *services.StreamingService
}

func NewVideoHandler(streamingService *services.StreamingService) *VideoHandler {
    return &VideoHandler{StreamingService: streamingService}
}

func (vh *VideoHandler) StreamVideo(w http.ResponseWriter, r *http.Request) {
    
    vh.StreamingService.StartStream(w, r)
}