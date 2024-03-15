var currentFileIndex = 0;
var currentQuestionIndex = 0;


function previewImage() {
    var input = document.getElementById('image-input');
    var preview = document.getElementById('preview-image');

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function submitData() {
    var question = document.getElementById('question').value;
    var choices = document.getElementById('choices').value;
    var answer = document.getElementById('answer').value;
    var explain = document.getElementById('explain').value;
    var subject = document.getElementById('subject').value;
    var grade = document.getElementById('grade').value;
    var input = document.getElementById('image-input');

    var newData = {
        'question': question,
        'choices': choices,
        'answer': answer,
        'explain': explain,
        'images': input.files[0]['name'],
        'subject': subject,
        'grade': grade
    };

    console.log(newData);
}

async function nextQuestion() {
    try {
        const response = await fetch('/question', {
            method: "POST",
            body: JSON.stringify({
                fileIdx: currentFileIndex,  
                questionIdx: currentQuestionIndex
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }); // Gửi yêu cầu POST tới backend

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Chuyển đổi phản hồi thành JSON
        console.log(data); // Log dữ liệu trả về từ backend
        // Xử lý dữ liệu ở đây (ví dụ: hiển thị trên trang web)
    } catch (error) {
        console.error('Error:', error);
    }
}


nextQuestion()
function nextFile() {
    
}

function updateQuestionFields() {
    
}