using API.DTOs;
using API.Models;
using AutoMapper;

namespace API.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CreateProductDto, Product>();
        CreateMap<UpdateProductDto, Product>().ForAllMembers(opts =>
            opts.Condition((src, dest, srcMember) => srcMember != null));
    }
}