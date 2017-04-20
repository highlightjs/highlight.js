func makeRequest(method string, url string, cb func(error, io.ReadCloser)) {
    req, _ := http.NewRequest(method, url, nil)
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        cb(err, nil)
    } else {
        cb(err, resp.Body)
    }
}
func main() {
    makeRequest("GET", "http://ipinfo.io/json", func(err error, body io.ReadCloser) {
        defer body.Close()
        io.Copy(os.Stdout, body)
    })
}
