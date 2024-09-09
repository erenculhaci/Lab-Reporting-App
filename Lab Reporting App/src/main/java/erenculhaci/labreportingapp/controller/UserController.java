package erenculhaci.labreportingapp.controller;
import erenculhaci.labreportingapp.entity.User;
import erenculhaci.labreportingapp.service.*;
import lombok.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @PostMapping("/admin/createUser")
    public ResponseEntity<String> createUser(@RequestParam String username, @RequestParam String password, @RequestParam String email, @RequestParam String role) {
        return new ResponseEntity<>(userService.saveUser(username, password, email, role), HttpStatus.CREATED);
    }

    @PostMapping("/createUser")
    public ResponseEntity<String> createUser(@RequestParam String username, @RequestParam String password, @RequestParam String email) {
        return new ResponseEntity<>(userService.saveUser(username, password, email, "ROLE_USER"), HttpStatus.CREATED);
    }

    @GetMapping("/getUser")
    public ResponseEntity<User> getUser(@RequestParam String username) {
        return ResponseEntity.ok(userService.getUser(username));
    }

    @GetMapping("/admin/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/checkUser")
    public ResponseEntity<Boolean> checkUser(@RequestParam String username, @RequestParam String password) {
        return ResponseEntity.ok(userService.checkUser(username, password));
    }

    @PutMapping("/admin/updateUser")
    public ResponseEntity<String> updateUser(@RequestParam Long id, @RequestParam String username, @RequestParam String password, @RequestParam String email, @RequestParam String role) {
        return ResponseEntity.ok(userService.updateUser(id, username, password, email, role));
    }

    @DeleteMapping("/admin/deleteUser")
    public ResponseEntity<Void> deleteUser(@RequestParam Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}