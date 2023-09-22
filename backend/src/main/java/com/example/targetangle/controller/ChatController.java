package com.example.targetangle.controller;

import com.example.targetangle.model.ChatMessage;
import com.example.targetangle.service.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@CrossOrigin(origins = "*")
public class ChatController {

    @Value("${app.url}")
    private static final String appUrl = "http://localhost:8080";

    ChatMessageService chatMessageService;

    @Autowired
    public ChatController(ChatMessageService chatMessageService) {
        this.chatMessageService = chatMessageService;
    }

    @RequestMapping(value = "/chat_message", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<ChatMessage>> getAllChatMessages() {
        List<ChatMessage> chatMessages = chatMessageService.findAll();

        if (chatMessages.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(chatMessages, HttpStatus.OK);
    }

  @MessageMapping("/chat.sendMessage")
  @SendTo(appUrl + "/topic/public")
  public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        //System.out.println(chatMessage);
        chatMessageService.saveChatMessage(chatMessage);
        return chatMessage;
    }

  @MessageMapping("/chat.addUser")
  @SendTo({appUrl + "/topic/public"})
  public ChatMessage addUser(
      @Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        headerAccessor.getSessionAttributes().put("userimage", chatMessage.getSenderImg());
        headerAccessor.getSessionAttributes().put("date", chatMessage.getDate());
        return chatMessage;
    }
}
