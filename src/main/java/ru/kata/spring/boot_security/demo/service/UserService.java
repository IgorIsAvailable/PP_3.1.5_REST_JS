package ru.kata.spring.boot_security.demo.service;


import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;


@Service
public interface UserService extends UserDetailsService {
    void saveUser(User user);

    void updateUser(User user, Long id);

    List<User> getAllUsers();

    User getUserById(Long id);
    User getUserByUsername(String username);

    boolean deleteUserById(Long id);

}
