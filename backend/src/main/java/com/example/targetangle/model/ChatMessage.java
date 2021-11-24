package com.example.targetangle.model;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "chat_message")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private MessageType type;

    @Column
    private String content;

    @Column
    private String sender;

    @Column
    private String senderImg;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false)
    @CreationTimestamp
    private Date date;

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
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
