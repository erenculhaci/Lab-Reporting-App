package erenculhaci.labreportingapp.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportResponseDTO {

    private Long id;
    private Long fileNumber;

    private String diagnosisTitle;
    private String diagnosisDetails;

    private LocalDateTime reportDate;

    private String reportImageBase64;

    private Long labTechnicianId;
    private String labTechnicianName;
    private String labTechnicianSurname;

    private Long patientId;
    private String patientName;
    private String patientSurname;
}
