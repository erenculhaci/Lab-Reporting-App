package erenculhaci.labreportingapp.repository;

import erenculhaci.labreportingapp.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByFirstNameAndLastName(String firstName, String lastName);
    Optional<Patient> findById(Long id);
}