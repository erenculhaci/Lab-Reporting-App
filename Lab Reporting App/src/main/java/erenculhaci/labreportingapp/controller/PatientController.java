package erenculhaci.labreportingapp.controller;
import erenculhaci.labreportingapp.dto.PatientDTO;
import erenculhaci.labreportingapp.service.*;
import lombok.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PatientController {

    private final PatientService patientService;

    @PostMapping("/createPatient")
    public ResponseEntity<String> createPatient(@RequestBody PatientDTO patientDTO) {
        return new ResponseEntity<>(patientService.savePatient(patientDTO), HttpStatus.CREATED);
    }

    @GetMapping("/admin/getAllPatients")
    public ResponseEntity<List<PatientDTO>> getAllPatients() {
        List <PatientDTO> allPatients = patientService.getAllPatients();
        return new ResponseEntity<>(allPatients, HttpStatus.OK);
    }

    @GetMapping("/searchPatientByPatientNameSurname")
    public ResponseEntity<List<PatientDTO>> searchByPatientNameSurname(@RequestParam String patientFirstName, @RequestParam String patientLastName) {
        List <PatientDTO> patientList = patientService.searchByPatientNameSurname(patientFirstName, patientLastName);
        return new ResponseEntity<>(patientList, HttpStatus.OK);
    }

    @GetMapping("/searchPatientByPatientId")
    public ResponseEntity<List<PatientDTO>> searchByPatientId(@RequestParam Long id) {
        List <PatientDTO> patientList = patientService.searchByPatientId(id);
        return new ResponseEntity<>(patientList, HttpStatus.OK);
    }

    @PutMapping("/admin/updatePatient")
    public ResponseEntity<String> updatePatient(@RequestParam Long id, @RequestBody PatientDTO patientDTO) {
        return ResponseEntity.ok(patientService.updatePatient(id, patientDTO));
    }

    @DeleteMapping("/admin/deletePatient")
    public ResponseEntity<String> deletePatient(@RequestParam Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.ok("Patient with id: " + id + " has been deleted.");
    }

}
