package org.acme;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/members")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MemberResource {

    @GET
    public List<Member> list(@QueryParam("search") String search) {
        if (search != null && !search.isBlank()) {
            String term = "%" + search + "%";
            return Member.list("fullName LIKE ?1 OR nationalId LIKE ?2", term, term);
        }
        return Member.listAll();
    }

    @GET
    @Path("/{id}")
    public Member getById(@PathParam("id") Long id) {
        return Member.findById(id);
    }

    @POST
    @Transactional
    public Response create(Member member) {
        member.persist();
        return Response.created(URI.create("/api/members/" + member.id)).entity(member).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Member update(@PathParam("id") Long id, Member member) {
        Member entity = Member.findById(id);
        if (entity == null) throw new NotFoundException();
        entity.fullName = member.fullName;
        entity.nationalId = member.nationalId;
        entity.phone = member.phone;
        entity.joinDate = member.joinDate;
        entity.status = member.status;
        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        Member.deleteById(id);
        return Response.noContent().build();
    }

    @GET
    @Path("/stats")
    public Map<String, Long> stats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("total", Member.count());
        stats.put("active", Member.count("status = 'ACTIVE'"));
        stats.put("inactive", Member.count("status = 'INACTIVE'"));
        return stats;
    }
}