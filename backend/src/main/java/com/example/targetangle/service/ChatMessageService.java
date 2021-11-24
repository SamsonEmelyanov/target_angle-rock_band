package com.example.targetangle.service;

import com.example.targetangle.model.ChatMessage;
import com.example.targetangle.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMessageService {

    ChatMessageRepository chatMessageRepository;

    @Autowired
    public ChatMessageService(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    public List<ChatMessage> findAll(){
        return chatMessageRepository.findAll();
    }

    public ChatMessage saveChatMessage(ChatMessage chatMessage){
        return chatMessageRepository.save(chatMessage);
    }
}
