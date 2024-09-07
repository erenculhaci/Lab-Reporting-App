package erenculhaci.labreportingapp.service;

import erenculhaci.labreportingapp.dto.LabTechnicianDTO;
import erenculhaci.labreportingapp.entity.LabTechnician;
import erenculhaci.labreportingapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LabTechnicianService {
    private final LabTechnicianRepository labTechnicianRepository;

    private boolean LabTechnicianIdentityCheck(Long id){
        return id.toString().length() == 7;
    }

    public LabTechnicianDTO convertToDto(LabTechnician labTechnician) {
        return LabTechnicianDTO.builder()
                .id(labTechnician.getId())
                .firstName(labTechnician.getFirstName())
                .lastName(labTechnician.getLastName())
                .build();
    }

    public String saveLabTechnician(LabTechnicianDTO labTechnicianDTO) {
        if(!LabTechnicianIdentityCheck(labTechnicianDTO.getId())) {
            throw new RuntimeException("Lab Technician ID must be 7 digits.");
        }

        ModelMapper modelMapper = new ModelMapper();
        LabTechnician labTechnician = modelMapper.map(labTechnicianDTO, LabTechnician.class);
        labTechnicianRepository.save(labTechnician);

        return "Lab Technician with name: " + labTechnician.getFirstName() + " " + labTechnician.getLastName() + " and ID: " + labTechnician.getId() + " has been created.";
    }

    public List<LabTechnicianDTO> getAllLabTechnicians() {
        List<LabTechnician> labTechnicians = labTechnicianRepository.findAll();
        return labTechnicians.stream().map(this::convertToDto).toList();
    }

    public List<LabTechnicianDTO> searchByLabTechnicianNameSurname(String labTechnicianFirstName, String labTechnicianLastName) {
        List<LabTechnician> labTechnicians = labTechnicianRepository.findByFirstNameAndLastName(labTechnicianFirstName, labTechnicianLastName);
        return labTechnicians.stream().map(this::convertToDto).toList();
    }

    public List<LabTechnicianDTO> searchByLabTechnicianId(Long id) {
        Optional<LabTechnician> labTechnicians = labTechnicianRepository.findById(id);
        return labTechnicians.stream().map(this::convertToDto).toList();
    }

    public String updateLabTechnician(Long id, LabTechnicianDTO labTechnicianDTO) {

        LabTechnician labTechnician = labTechnicianRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lab Technician with ID: " + id + " not found."));

        labTechnician.setFirstName(labTechnicianDTO.getFirstName());
        labTechnician.setLastName(labTechnicianDTO.getLastName());

        labTechnicianRepository.save(labTechnician);

        return "Lab Technician updated with name: " + labTechnician.getFirstName() + " " + labTechnician.getLastName() + " and ID: " + labTechnician.getId();
    }

    public void deleteLabTechnician(Long id) {
        Optional<LabTechnician> labTechnician = labTechnicianRepository.findById(id);
        if(labTechnician.isEmpty()) {
            throw new RuntimeException("Lab Technician with ID: " + id + " not found.");
        }
        labTechnicianRepository.deleteById(id);
    }
}
