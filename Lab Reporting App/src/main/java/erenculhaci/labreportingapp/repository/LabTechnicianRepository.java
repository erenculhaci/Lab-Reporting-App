package erenculhaci.labreportingapp.repository;

import erenculhaci.labreportingapp.entity.LabTechnician;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LabTechnicianRepository extends JpaRepository<LabTechnician, Long> {
    List<LabTechnician> findByFirstNameAndLastName(String firstName, String lastName);
    Optional<LabTechnician> findById(Long id);
}