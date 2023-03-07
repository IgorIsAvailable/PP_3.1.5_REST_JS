package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.security.Principal;


@Controller
@RequestMapping("/user")
public class  UsersController {
    private final UserService userService;

    public UsersController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/show")
    public String user(Model model, Principal principal) {
        User user =  userService.getUserByUsername(principal.getName());
        model.addAttribute("user", user);
        model.addAttribute("userRoles", user.getRoles());
        return "/USER/show";
    }


}
