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
    public ResponseEntity<String> createReport(@RequestParam String username, @RequestParam String password, @RequestParam String email, @RequestParam String role) {
        return new ResponseEntity<>(userService.saveUser(username, password, email, role), HttpStatus.CREATED);
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
    public ResponseEntity<String> updateReport(@RequestParam Long id, @RequestParam String username, @RequestParam String password, @RequestParam String email, @RequestParam String role) {
        return ResponseEntity.ok(userService.updateUser(id, username, password, email, role));
    }

    @DeleteMapping("/admin/deleteUser")
    public ResponseEntity<Void> deleteReport(@RequestParam Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}