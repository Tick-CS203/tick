package com.tick.paymentservice;

import java.util.*;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Value;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private String apiKey;
    private String successURL;
    private String canceledURL;

    @GetMapping
    public String health_check() {
        return "Service is running";
    }

    public PaymentController(@Value("${stripe.apikey}") String apiKey,
            @Value("${frontend.successURL}") String successURL, @Value("${frontend.canceledURL}") String canceledURL) {
        this.apiKey = apiKey;
        this.successURL = successURL;
        this.canceledURL = canceledURL;
    }

    // { quantity: 2, priceID: XXXX }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/create-checkout-session")
    public String createSession(@RequestBody List<LineItemRequest> cartItems) {
        Stripe.apiKey = this.apiKey;

        List<SessionCreateParams.LineItem> liList = new ArrayList<>();

        for (LineItemRequest i : cartItems) {
            SessionCreateParams.LineItem li = SessionCreateParams.LineItem.builder()
                    .setQuantity(i.getQuantity())
                    .setPrice(i.getPriceID())
                    .build();

            liList.add(li);
        }

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(successURL)
                .setCancelUrl(canceledURL)
                .addAllLineItem(liList)
                .build();
        try {
            Session session = Session.create(params);
            return session.getUrl();
        } catch (Exception e) {
            return e.toString();
        }
    }
}
