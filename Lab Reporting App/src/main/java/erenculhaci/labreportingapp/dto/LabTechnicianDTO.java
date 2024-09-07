package erenculhaci.labreportingapp.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LabTechnicianDTO {
    private Long id;
    private String firstName;
    private String lastName;
}