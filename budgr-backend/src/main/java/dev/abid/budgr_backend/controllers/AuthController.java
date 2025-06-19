package dev.abid.budgr_backend.controllers;

import dev.abid.budgr_backend.models.User;
import dev.abid.budgr_backend.repositories.UserRepository;
import dev.abid.budgr_backend.securities.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 * Authentication endpoints: register and login.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // DTO for auth requests
    public static class AuthRequest {
        public String username;
        public String password;
    }

    /**
     * Register a new user. Returns success or error if username exists.
     */
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequest req) {
        if (req.username == null || req.password == null) {
            return ResponseEntity.badRequest().body("Username and password required");
        }
        if (userRepo.findByUsername(req.username).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        User user = new User();
        user.setUsername(req.username);
        user.setPassword(passwordEncoder.encode(req.password));
        userRepo.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    /**
     * Login endpoint: authenticate and return JWT token.
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest req) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.username, req.password)
            );
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        String token = jwtUtil.generateToken(req.username);
        return ResponseEntity.ok(token);
    }
}
