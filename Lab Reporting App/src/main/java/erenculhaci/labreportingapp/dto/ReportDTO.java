package erenculhaci.labreportingapp.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportDTO {

    private Long fileNumber;
    private String diagnosisTitle;
    private String diagnosisDetails;
    private Long labTechnicianId;
    private Long patientId;
}
