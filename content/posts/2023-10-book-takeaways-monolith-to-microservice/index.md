--- 
slug: book-takeaways-monolith-to-microservice
title: (Book-Takeaways) Monolith to Microservices by Sam Newman

date: 2023-10-24

tags: 

  - Books
  - Book-Takeaways

--- 




Recently, while reading Monolith to Microservices by Sam Newman, I found myself drawn to its practical insights on transforming monolithic systems into scalable, independent microservices. The book offers a treasure trove of strategies and principles that not only address technical challenges but also highlight the importance of aligning architecture with real business needs

I highly recommend watching [Sam Newman’s talk on this topic](https://www.youtube.com/watch?v=GBTdnfD6s5Q&ab_channel=GOTOConferences), which complements the book beautifully.

---

In *Monolith to Microservices*, Sam Newman masterfully guides readers through the process of transitioning from monolithic systems to microservice architectures. This transition is not a simple goal but a thoughtful journey that requires addressing real-world constraints and business needs.


![](image.png)
---

#### Key Takeaways:

1. **Microservices Aren't the Goal**  
   Microservices are not an end goal but a means to achieve specific outcomes like independent deployability, scalability, and better system robustness. Always focus on solving your business challenges rather than following trends.

2. **Independent Deployability is Key**  
   A core principle of microservices is the ability to deploy independently. This reduces risks, allows faster releases, and simplifies debugging when something goes wrong.

3. **Avoid Database Coupling**  
   Shared databases hinder independent deployability. Instead, use APIs to encapsulate data interactions or implement database-wrapping patterns to minimize coupling.

4. **Cohesion Over Coupling**  
   - **Cohesion**: "The code that changes together, stays together." It ensures modularity and stability.
   - **Coupling**: Strive to reduce coupling (e.g., temporal, deployment, or domain coupling) as it makes systems more interdependent and harder to manage.

5. **Smaller, Safer Releases**  
   Smaller, frequent releases reduce risks and make it easier to identify and fix issues. This aligns well with principles of continuous delivery.

6. **Design with Context**  
   Avoid blindly copying other implementations. Consider your specific problems and constraints, then design solutions tailored to your context.

7. **Transition Strategies**  
   - **Strangler Pattern**: Gradually replace monolithic functionality with microservices by rerouting calls to new services using proxies or routers.
   - **Content-Based Routers**: Intercept and redirect messaging for gradual migration in message queue systems.
   - **Database Wrapping**: Use services to wrap databases and separate write/read concerns.

8. **Choose Simplicity**  
   Technologies like Kubernetes, Docker, or certain programming languages aren’t mandatory for microservices. Prioritize simplicity and what works best for your team and use case.

9. **Metrics and Observability**  
   Tools like Jaeger can help capture distributed traces and analyze the performance of microservices. Observability is essential in managing distributed systems.

10. **Team Autonomy**  
    Empower teams with ownership over their codebase. Merge responsibilities across traditional silos (e.g., frontend and backend teams) to align with microservice boundaries.

11. **Regular Checkpoints and Iteration**  
    Progress should be assessed with regular checkpoints:
    - Restate goals.
    - Evaluate progress.
    - Gather feedback.
    - Define next steps.

---

#### Memorable Quotes:
- "Microservices are independently deployable services modeled around a business domain."
- "Cohesion: The code that changes together, stays together."
- "Don’t just copy others; think instead about your problem and your context."
- "Microservices are not a goal!"

---

#### Actionable Insights:
- Start small: Break monolithic applications by identifying and prioritizing high-value, low-complexity features for migration.
- Measure what matters: Track time and effort across software delivery steps to identify bottlenecks.
- Cultivate a "teachable moment" mindset: Empower teams with confidence, motivation, and autonomy.

---