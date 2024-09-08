package erenculhaci.labreportingapp.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import erenculhaci.labreportingapp.dto.ReportDTO;
import erenculhaci.labreportingapp.dto.ReportResponseDTO;
import erenculhaci.labreportingapp.service.*;
import lombok.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/createReport")
    public ResponseEntity<String> createReport(@RequestPart("reportDTO") String reportDTOString,
                                               @RequestPart("photo") MultipartFile photo) {

        try {
            ReportDTO reportDTO = new ObjectMapper().readValue(reportDTOString, ReportDTO.class);
            return new ResponseEntity<>(reportService.saveReport(reportDTO, photo), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/admin/getAllReports")
    public ResponseEntity<List<ReportResponseDTO>> getAllReports() {
        List <ReportResponseDTO> reportList = reportService.getAllReports();
        return new ResponseEntity<>(reportList, HttpStatus.OK);
    }

    @GetMapping("/searchReportByPatientNameSurname")
    public ResponseEntity<List<ReportResponseDTO>> searchByPatientNameSurname(@RequestParam String patientFirstName, @RequestParam String patientLastName) {
        List <ReportResponseDTO> reportList = reportService.searchByPatientNameSurname(patientFirstName, patientLastName);
        return new ResponseEntity<>(reportList, HttpStatus.OK);
    }

    @GetMapping("/searchReportByPatientTC")
    public ResponseEntity<List<ReportResponseDTO>> searchByPatientTC(@RequestParam Long patientTC) {
        List <ReportResponseDTO> reportList = reportService.searchByPatientTC(patientTC);
        return new ResponseEntity<>(reportList, HttpStatus.OK);
    }

    @GetMapping("/searchReportByLabTechnician")
    public ResponseEntity<List<ReportResponseDTO>> searchByLabTechnician(@RequestParam String labTechnicianName, @RequestParam String labTechnicianSurname) {
        List <ReportResponseDTO> reportList = reportService.searchByLabTechnician(labTechnicianName, labTechnicianSurname);
        return new ResponseEntity<>(reportList, HttpStatus.OK);
    }

    @PutMapping("/admin/updateReport")
    public ResponseEntity<String> updateReport(@RequestParam Long id, @RequestPart("reportDTO") String reportDTOString, @RequestPart("photo") MultipartFile photo) {
        try {
            ReportDTO reportDTO = new ObjectMapper().readValue(reportDTOString, ReportDTO.class);
            return new ResponseEntity<>(reportService.updateReport(id, reportDTO, photo), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/admin/deleteReport")
    public ResponseEntity<Void> deleteReport(@RequestParam Long id) {
        reportService.deleteReport(id);
        return ResponseEntity.noContent().build();
    }
}
