package erenculhaci.labreportingapp.service;

import erenculhaci.labreportingapp.dto.*;
import erenculhaci.labreportingapp.entity.*;
import erenculhaci.labreportingapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final LabTechnicianRepository labTechnicianRepository;
    private final PatientRepository patientRepository;
    private final ModelMapper modelMapper;

    //////////////// Save Report  ///////////////
    public String saveReport(ReportDTO reportDTO, MultipartFile reportImage) {

        LabTechnician labTechnician = labTechnicianRepository.findById(reportDTO.getLabTechnicianId())
                .orElseThrow(() -> new IllegalArgumentException("Lab technician with id: " + reportDTO.getLabTechnicianId() + " not found"));
        Patient patient = patientRepository.findById(reportDTO.getPatientId())
                .orElseThrow(() -> new IllegalArgumentException("Patient with id: " + reportDTO.getPatientId() + " not found"));

        Report report = Report.builder()
                .fileNumber(reportDTO.getFileNumber())
                .diagnosisTitle(reportDTO.getDiagnosisTitle())
                .diagnosisDetails(reportDTO.getDiagnosisDetails())
                .reportDate(LocalDateTime.now())
                .labTechnician(labTechnician)
                .patient(patient)
                .build();

        if (reportImage != null && !reportImage.isEmpty()) {
            try {
                report.setReportImage(reportImage.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Error processing the report image", e);
            }
        }

        Report savedReport = reportRepository.save(report);

        return "Report saved with id: " + savedReport.getId() + " and file number: " + savedReport.getFileNumber();
    }

    /////////////// Get Report  ///////////////
    public List<ReportResponseDTO> getAllReports() {
        List<Report> reportList = reportRepository.findAllByOrderByReportDateDesc();
        return reportList.stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<ReportResponseDTO> searchByPatientNameSurname(String patientFirstName, String patientLastName) {
        List<Report> reportList = reportRepository.findByPatient_FirstNameAndPatient_LastNameOrderByReportDateDesc(patientFirstName, patientLastName);
        return reportList.stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<ReportResponseDTO> searchByPatientTC(Long patientTC) {
        List<Report> reportList = reportRepository.findByPatient_IdOrderByReportDateDesc(patientTC);
        return reportList.stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<ReportResponseDTO> searchByLabTechnician(String labTechnicianName, String labTechnicianSurname) {
        List<Report> reportList = reportRepository.findByLabTechnician_FirstNameAndLabTechnician_LastNameOrderByReportDateDesc(labTechnicianName, labTechnicianSurname);
        return reportList.stream()
                .map(this::convertToDTO)
                .toList();
    }

    /////////////// Update Report  ///////////////
    public String updateReport(Long reportId, ReportDTO reportDTO, MultipartFile reportImage) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new IllegalArgumentException("Report not found"));
        LabTechnician labTechnician = labTechnicianRepository.findById(reportDTO.getLabTechnicianId())
                .orElseThrow(() -> new IllegalArgumentException("Lab technician not found"));
        Patient patient = patientRepository.findById(reportDTO.getPatientId())
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));

        report.setFileNumber(reportDTO.getFileNumber());
        report.setDiagnosisTitle(reportDTO.getDiagnosisTitle());
        report.setDiagnosisDetails(reportDTO.getDiagnosisDetails());
        report.setPatient(patient);
        report.setLabTechnician(labTechnician);
        report.setReportDate(LocalDateTime.now());

        if (reportImage != null && !reportImage.isEmpty()) {
            try {
                report.setReportImage(reportImage.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Error processing the report image", e);
            }
        }

        reportRepository.save(report);

        return "The report having report id: " + report.getId() +  " is updated successfully.";
    }

    public void deleteReport(Long reportId) {
        reportRepository.deleteById(reportId);
    }

    /////////////// Convert Report to DTO  ///////////////
    private ReportResponseDTO convertToDTO(Report report) {
        return ReportResponseDTO.builder()
                .fileNumber(report.getFileNumber())
                .diagnosisTitle(report.getDiagnosisTitle())
                .diagnosisDetails(report.getDiagnosisDetails())
                .reportDate(report.getReportDate())
                .reportImageBase64(Base64.getEncoder().encodeToString(report.getReportImage()))
                .labTechnicianName(report.getLabTechnician().getFirstName())
                .labTechnicianSurname(report.getLabTechnician().getLastName())
                .patientName(report.getPatient().getFirstName())
                .patientSurname(report.getPatient().getLastName())
                .build();
    }
}
