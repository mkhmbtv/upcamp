const Icon = ({ iconTitle }) => {
  return (
    <>
      {
        {
          'Toilets available': <i className="las la-toilet-paper"></i>,
          'Campfires allowed': <i className="las la-fire"></i>,
          'Pets allowed': <i className="las la-dog"></i>,
          'Portable water available': <i className="las la-tint"></i>,
          'Kitchen available': <i className="las la-utensils"></i>,
          'Showers available': <i className="las la-bath"></i>,
          'Picnic table available': <i className="lar la-square"></i>,
          'Wifi available': <i className="las la-wifi"></i>,
          'Bins available': <i className="las la-trash"></i>,
          'Tent camping': <i className="las la-campground"></i>,
          'RV park': <i className="las la-shuttle-van"></i>,
          'Cabin': <i className="las la-home"></i>,
          'Treehouse': <i class="las la-tree"></i>,
          'Glamping': <i class="las la-glass-martini-alt"></i>
        }[iconTitle]
      }
    </>
  );
};

export default Icon;