package com.dxc.service;
import java.util.*;
import javax.mail.*;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.dxc.model.Customer;

import java.util.Properties;

public class SendEmailTLS {

    public void sendEmail(String subject,String body,Customer customer )
    {
        final String username = "help.washcherei@gmail.com";
        final String password = "7382991997";

        Properties prop = new Properties();
		prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true"); //TLS
        
        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("help.washcherei@gmail.com"));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(customer.getCustEmail())
            );
            message.setSubject(subject);
            message.setText("Dear Sir/Mam ,"
                    + "\n\n "+body);

            Transport.send(message);

            System.out.println("Done");

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

}






