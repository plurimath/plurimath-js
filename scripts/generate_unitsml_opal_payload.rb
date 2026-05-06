# frozen_string_literal: true

require "ox"
require "unitsdb"

module PlurimathJs
  module UnitsmlOpalPayloadGenerator
    module_function

    def build_payload_hash(database_path: nil)
      source_path = database_path || Unitsdb.data_dir
      ::Unitsdb::Database.from_db(source_path).to_hash
    end

    def to_ruby_source(database_hash)
      rendered_hash = database_hash.inspect

      <<~RUBY
        # frozen_string_literal: true

        require "unitsml"
        require "unitsml/unitsdb"

        Unitsml::Unitsdb::Database.load_opal_payload(
          #{rendered_hash}.freeze,
        )
      RUBY
    end

    def write_to(file_path, database_hash: nil, database_path: nil)
      payload_hash = database_hash || build_payload_hash(database_path: database_path)
      absolute_path = File.expand_path(file_path)

      File.write(absolute_path, to_ruby_source(payload_hash))
      absolute_path
    end
  end
end

if $PROGRAM_NAME == __FILE__
  output_path = ARGV[0]
  database_path = ARGV[1]

  abort "Usage: ruby scripts/generate_unitsml_opal_payload.rb OUTPUT_PATH [DATABASE_PATH]" unless output_path

  PlurimathJs::UnitsmlOpalPayloadGenerator.write_to(
    output_path,
    database_path: database_path,
  )
end
