package erenculhaci.labreportingapp.service;

import erenculhaci.labreportingapp.entity.*;
import erenculhaci.labreportingapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String saveUser(String username, String password, String email, String role) {
        userRepository.save(User.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .email(email)
                .role(Role.valueOf(role))
                .build());
        return "User saved successfully";
    }

    public String updateUser(Long id, String username, String password, String email, String role) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser == null) {
            return "User not found";
        }
        existingUser.setUsername(username);
        existingUser.setPassword(passwordEncoder.encode(password));
        existingUser.setEmail(email);
        existingUser.setRole(Role.valueOf(role));

        userRepository.save(existingUser);
        return "User updated successfully";
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
