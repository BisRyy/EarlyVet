package video

type Video struct {
    ID    string
    Title string
    URL   string
}

func (v *Video) GetMetadata() map[string]string {
    return map[string]string{
        "id":    v.ID,
        "title": v.Title,
        "url":   v.URL,
    }
}