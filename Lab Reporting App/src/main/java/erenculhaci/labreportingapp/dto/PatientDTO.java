package erenculhaci.labreportingapp.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {
    private Long id;
    private String firstName;
    private String lastName;
}