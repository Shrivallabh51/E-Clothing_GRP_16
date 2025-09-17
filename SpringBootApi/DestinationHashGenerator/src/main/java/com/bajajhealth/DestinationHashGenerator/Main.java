package com.bajajhealth.DestinationHashGenerator;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

public class Main {
                         
    public static void main(String[] args) {
        try {
            if (args.length < 2) {
                System.out.println("Usage: java -jar <jar-file> <PRN_Number> <JSON_File_Path>");
                return;
            }

            String prnNumber = args[0].toLowerCase().replaceAll("\\s", "");
            String jsonFilePath = args[1];

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(new File(jsonFilePath));

            String destinationValue = findDestination(rootNode);
            if (destinationValue == null) {
                System.out.println("Destination key not found.");
                return;
            }

            String randomString = generateRandomString();
            String concatenated = prnNumber + destinationValue + randomString;
            String hash = generateMD5(concatenated);

            System.out.println(hash + ";" + randomString);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String findDestination(JsonNode node) {
        if (node.has("destination")) {
            return node.get("destination").asText();
        }
        for (JsonNode child : node) {
            String result = findDestination(child);
            if (result != null) {
                return result;
            }
        }
        return null;
    }

    public static String generateRandomString() {
        int length = 8;
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(characters.charAt(random.nextInt(characters.length())));
        }
        return sb.toString();
    }

    public static String generateMD5(String input) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] messageDigest = md.digest(input.getBytes());
        BigInteger no = new BigInteger(1, messageDigest);
        String hashtext = no.toString(16);
        while (hashtext.length() < 32) {
            hashtext = "0" + hashtext;
        }
        return hashtext;
    }
}
