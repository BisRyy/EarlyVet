package services

import (
    "net/http"
    "os"
    "path/filepath"
)

type StreamingService struct {
    VideoPath string
}

func (s *StreamingService) StartStream(w http.ResponseWriter, r *http.Request) {
    file, err := os.Open(s.VideoPath)
    if err != nil {
        http.Error(w, "Video not found.", http.StatusNotFound)
        return
    }
    defer file.Close()

    fileInfo, err := file.Stat()
    if err != nil {
        http.Error(w, "Could not get file info.", http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "video/mp4")
    http.ServeContent(w, r, filepath.Base(s.VideoPath), fileInfo.ModTime(), file)
}

func (s *StreamingService) StopStream(w http.ResponseWriter, r *http.Request) {
    // Logic to stop streaming a video
    // This could involve closing connections, stopping any background processes, etc.
    // For simplicity, we'll just send a response indicating the stream has stopped.
    w.WriteHeader(http.StatusOK)
    w.Write([]byte("Stream stopped"))
}