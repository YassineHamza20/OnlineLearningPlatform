import logging
import google.generativeai as genai
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from face_recognition import load_image_file, face_locations
from google.ai import generativelanguage as glm
import json
import markdown

logger = logging.getLogger(__name__)

@csrf_exempt
def detectface(request):
    if request.method == 'POST':
        try:
            imageFile = request.FILES['image']
            image = load_image_file(imageFile)
            face_encodings_list = face_locations(image)
            if face_encodings_list:
                return JsonResponse({"faces": True})
            else:
                return JsonResponse({"faces": False})
        except Exception as e:
            logger.error(f"Error processing image: {e}")
            return HttpResponseBadRequest("Error processing image")
    else:
        return HttpResponseBadRequest("Image file not provided or invalid method")


genai.configure(api_key="AIzaSyBFzKNI02At6aCko5ldFvvrLvfFJCw1a6o")

@csrf_exempt
def chat(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode("utf-8"))
        print("data:", data)
        text = data.get('messages')[-1] if data.get('messages') else f"You are a helpful teacher. I will talk with you in {data.get('language')} about the topic of {data.get('topic')}. Starting from now, you will only answer in {data.get('language')} and always keep in mind my grammatical errors and point them out to me. Now, tell me that you understood me and wait for me."
        model = genai.GenerativeModel("gemini-pro")
        if(data.get('messages')):
            history = [
                glm.Content(
                    role ="user",
                    parts=[
                        glm.Part(text=f"You are a helpful teacher. I will talk with you in {data.get('language')} language about the topic {data.get('topic')}. Starting from now, you will only answer in {data.get('language')} and always keep in mind my grammatical errors and point them out to me. Now, tell me that you understood me and wait for me.")
                    ]
                ) 
            ]
        else:
            history = []
        for i in range(0, len(data.get('messages'))-1):
            if(i%2 ==0 ):
                history.append(
                    glm.Content(
                        role="model",
                        parts=[
                            glm.Part(text=data.get('messages')[i])
                        ]
                    )
                )
            else:
                history.append(
                    glm.Content(
                        role="user",
                        parts=[
                            glm.Part(text=data.get('messages')[i])
                        ]
                    )
                )
        print("history: ", history)
            
        chat = model.start_chat(history= history)
        print("text: ", text)
        response = chat.send_message(text)
        
        response_data = {
            "text": markdown.markdown(response.text),  # Assuming response.text contains the relevant response data
            # Add other relevant data from response if needed
        }


        print('text: ', response.text)

        print("history:", history) 
        return JsonResponse({"data": response_data})