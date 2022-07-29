const video = document.getElementById('video');
let emotion = '';
const validEmotions = ['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised'];
    
    
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models'),
]).then(startVideo)
    
function startVideo() {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video: true})
    .then(stream => video.srcObject = stream,
      err => console.error(err));
  }
}
    
video.addEventListener('playing', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  var interval = setInterval(async () => {
    let maxProb = 0;
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    const expressions = detections[0].expressions;
    Object.keys(expressions).forEach((key) => {
      if (maxProb <= expressions[key]) {
        maxProb = expressions[key];
        emotion = key;
      }
    });
      if (validEmotions.includes(emotion)) {
        if (emotion === 'neutral') {
           window.open('')
        } else {
            window.open(`${window.location.href}/Home`);
        }
        clearInterval(interval);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      }
    
  }, 100);
});