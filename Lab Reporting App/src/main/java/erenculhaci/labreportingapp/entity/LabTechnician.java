package erenculhaci.labreportingapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LabTechnician {
    @Id
    private Long id;

    private String firstName;
    private String lastName;

    @OneToMany(mappedBy = "labTechnician")
    private List<Report> reports;

}
