package erenculhaci.labreportingapp.configuration;

import erenculhaci.labreportingapp.entity.Role;
import erenculhaci.labreportingapp.entity.User;
import erenculhaci.labreportingapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class AppConfig {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initializeDefaultUser() {
        return args -> {
            if (userRepository.count() == 0) {
                User admin = User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin123"))
                        .email("admin@example.com")
                        .role(Role.ROLE_ADMIN)
                        .build();
                userRepository.save(admin);
            }
        };
    }
}
