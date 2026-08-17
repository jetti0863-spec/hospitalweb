using GBIT.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace GBIT.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        // Temporary List (acts like a database)
        private static List<Item> items = new List<Item>();

        // GET : api/item
        [HttpGet]
        public ActionResult<List<Item>> GetItems()
        {
            return Ok(items);
        }

        // POST : api/item
        [HttpPost]
        public ActionResult AddItem(Item item)
        {
            item.Id = items.Count + 1;

            items.Add(item);

            return Ok(new
            {
                Message = "Item Added Successfully"
            });
        }

        // DELETE : api/item/1
        [HttpDelete("{id}")]
        public ActionResult DeleteItem(int id)
        {
            var item = items.FirstOrDefault(x => x.Id == id);

            if (item == null)
            {
                return NotFound();
            }

            items.Remove(item);

            return Ok(new
            {
                Message = "Item Deleted Successfully"
            });
        }
    }
}