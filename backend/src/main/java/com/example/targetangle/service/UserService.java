package com.example.targetangle.service;

import com.example.targetangle.model.User;
import com.example.targetangle.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean isUserExist(String email){

        return userRepository.existsByEmail(email);
    }


    public Optional<User> findByEmail(String email){

        return userRepository.findByEmail(email);
    }
}
