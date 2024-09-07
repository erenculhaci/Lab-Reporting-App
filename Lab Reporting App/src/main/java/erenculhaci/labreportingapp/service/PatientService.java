package erenculhaci.labreportingapp.service;

import erenculhaci.labreportingapp.dto.PatientDTO;
import erenculhaci.labreportingapp.entity.Patient;
import erenculhaci.labreportingapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;

    private boolean PatientIdentityCheck(Long id){
        return id.toString().length() == 11;
    }

    public PatientDTO convertToDto(Patient patient) {
        return PatientDTO.builder()
                .id(patient.getId())
                .firstName(patient.getFirstName())
                .lastName(patient.getLastName())
                .build();
    }

    public String savePatient(PatientDTO patientDTO) {
        if(!PatientIdentityCheck(patientDTO.getId())) {
            throw new RuntimeException("Patient ID must be 11 digits.");
        }

        ModelMapper modelMapper = new ModelMapper();
        Patient patient = modelMapper.map(patientDTO, Patient.class);
        patientRepository.save(patient);

        return "Patient with name: " + patient.getFirstName() + " " + patient.getLastName() + " and ID: " + patient.getId() + " has been created.";
    }

    public List<PatientDTO> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        return patients.stream().map(this::convertToDto).toList();
    }

    public List<PatientDTO> searchByPatientNameSurname(String patientFirstName, String patientLastName) {
        List<Patient> patients = patientRepository.findByFirstNameAndLastName(patientFirstName, patientLastName);
        return patients.stream().map(this::convertToDto).toList();
    }

    public List<PatientDTO> searchByPatientId(Long id) {
        Optional<Patient> patients = patientRepository.findById(id);
        return patients.stream().map(this::convertToDto).toList();
    }

    public String updatePatient(Long id, PatientDTO patientDTO) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient with ID: " + id + " not found."));

        patient.setFirstName(patientDTO.getFirstName());
        patient.setLastName(patientDTO.getLastName());

        patientRepository.save(patient);
        return "Patient updated with name: " + patient.getFirstName() + " " + patient.getLastName() + " and ID: " + patient.getId() + ".";
    }

    public void deletePatient(Long id) {
        Optional<Patient> patient = patientRepository.findById(id);
        if(patient.isEmpty()) {
            throw new RuntimeException("Patient with ID: " + id + " not found.");
        }
        patientRepository.deleteById(id);
    }
}
