package com.example.targetangle.model;

import java.util.Date;

public class ChatMessage {
    private MessageType type;
    private String content;
    private String sender;
    private String senderImg;
    private Date date;

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public MessageType getType() {
        return type;
    }

    public void setSenderImg(String senderImg) {
        this.senderImg = senderImg;
    }

    public String getSenderImg() {
        return senderImg;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    @Override
    public String toString() {
        return "ChatMessage{" +
                "type=" + type +
                ", content='" + content + '\'' +
                ", sender='" + sender + '\'' +
                ", senderImg='" + senderImg + '\'' +
                ", date=" + date +
                '}';
    }
}
