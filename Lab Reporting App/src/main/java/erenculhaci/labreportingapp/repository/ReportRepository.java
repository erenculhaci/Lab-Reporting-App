package erenculhaci.labreportingapp.repository;
import erenculhaci.labreportingapp.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByPatient_FirstNameAndPatient_LastNameOrderByReportDateDesc(String firstName, String lastName);
    List<Report> findByPatient_IdOrderByReportDateDesc(Long patientTC);
    List<Report> findByLabTechnician_FirstNameAndLabTechnician_LastNameOrderByReportDateDesc(String firstName, String lastName);
    List<Report> findAllByOrderByReportDateDesc();
}
