package erenculhaci.labreportingapp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    @Id
    private Long id;

    private String firstName;
    private String lastName;

    @OneToMany(mappedBy = "patient")
    private List<Report> reports;
}
