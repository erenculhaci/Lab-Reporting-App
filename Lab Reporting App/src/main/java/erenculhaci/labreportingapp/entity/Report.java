package erenculhaci.labreportingapp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private Long fileNumber;

    private String diagnosisTitle;
    private String diagnosisDetails;

    private LocalDateTime reportDate;

    private byte[] reportImage;

    @ManyToOne
    private Patient patient;

    @ManyToOne
    private LabTechnician labTechnician;

}
